"use client";

import { Camera, ImageUp, RotateCw, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ServiceNotice } from "@/features/forms/form-parts";
import { checkImageFile } from "@/features/glow-scan/logic";
import { analysePhoto } from "@/services/glow-scan";

type CameraState =
  | { kind: "idle"; message?: string }
  | { kind: "requesting" }
  | { kind: "live" }
  | { kind: "captured"; url: string };

/**
 * Local camera / upload preview. The photo exists only as an in-memory Blob and an
 * object URL: it is never written to storage, logs, the URL or analytics, and it is
 * not transmitted (photo analysis is not connected). Media tracks stop on capture,
 * cancel, track end and unmount; object URLs are revoked on retake, remove and unmount.
 */
export function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const urlRef = useRef<string | null>(null);
  const blobRef = useRef<Blob | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<CameraState>({ kind: "idle" });
  const [cameraSupported, setCameraSupported] = useState(false);
  const [analyseOutcome, setAnalyseOutcome] = useState<"not-connected" | null>(null);
  const [rotateFailed, setRotateFailed] = useState(false);

  useEffect(() => {
    setCameraSupported(window.isSecureContext && !!navigator.mediaDevices?.getUserMedia);
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const discardPhoto = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    blobRef.current = null;
    setAnalyseOutcome(null);
    setRotateFailed(false);
  }, []);

  const showPhoto = useCallback(
    (blob: Blob) => {
      discardPhoto();
      blobRef.current = blob;
      urlRef.current = URL.createObjectURL(blob);
      setState({ kind: "captured", url: urlRef.current });
    },
    [discardPhoto],
  );

  useEffect(
    () => () => {
      stopStream();
      discardPhoto();
    },
    [stopStream, discardPhoto],
  );

  async function openCamera() {
    discardPhoto();
    setState({ kind: "requesting" });
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      // Permission withdrawn or device unplugged mid-preview.
      stream.getVideoTracks().forEach((track) =>
        track.addEventListener("ended", () => {
          stopStream();
          setState({ kind: "idle", message: "The camera stopped. You can open it again or upload a photo." });
        }),
      );
      setState({ kind: "live" });
    } catch (error) {
      stopStream();
      const name = error instanceof DOMException ? error.name : "";
      setState({
        kind: "idle",
        message:
          name === "NotAllowedError" || name === "SecurityError"
            ? "Camera access was blocked. You can allow it in your browser settings, upload a photo instead, or continue without one."
            : name === "NotFoundError" || name === "OverconstrainedError"
              ? "We couldn't find a camera on this device. Upload a photo instead, or continue without one."
              : "The camera couldn't start. Upload a photo instead, or continue without one.",
      });
    }
  }

  useEffect(() => {
    if (state.kind === "live" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      void videoRef.current.play().catch(() => undefined);
    }
  }, [state.kind]);

  function capture() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    stopStream();
    canvas.toBlob((blob) => {
      if (blob) showPhoto(blob);
      else setState({ kind: "idle", message: "That capture didn't work. Please try again." });
    }, "image/jpeg", 0.9);
  }

  function cancelCamera() {
    stopStream();
    setState({ kind: "idle" });
  }

  function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const check = checkImageFile(file);
    if (!check.ok) {
      setState({ kind: "idle", message: check.message });
      return;
    }
    stopStream();
    showPhoto(file);
  }

  async function rotate() {
    const blob = blobRef.current;
    if (!blob) return;
    try {
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.height;
      canvas.height = bitmap.width;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
      bitmap.close();
      canvas.toBlob((rotated) => rotated && showPhoto(rotated), "image/jpeg", 0.9);
    } catch {
      setRotateFailed(true);
    }
  }

  function remove() {
    discardPhoto();
    setState({ kind: "idle", message: "Photo removed from this device." });
  }

  return (
    <div className="space-y-4">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg bg-espresso">
        {state.kind === "live" && (
          <video
            ref={videoRef}
            playsInline
            muted
            aria-label="Live camera preview"
            className="size-full -scale-x-100 object-cover"
          />
        )}
        {state.kind === "captured" && (
          // eslint-disable-next-line @next/next/no-img-element -- local object URL; must not go through the image optimiser
          <img src={state.url} alt="Your photo preview" className="size-full object-cover" />
        )}
        {(state.kind === "idle" || state.kind === "requesting") && (
          <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-ivory">
            <Camera aria-hidden className="size-8 text-gold" />
            <p className="text-sm">
              {state.kind === "requesting" ? "Waiting for camera permission…" : "Face the light, remove glasses, and keep a neutral expression."}
            </p>
          </div>
        )}
        {/* Decorative framing guide. */}
        <div aria-hidden className="pointer-events-none absolute inset-[9%] rounded-[45%] border border-ivory/40" />
      </div>

      <p className="text-center font-mono text-xs text-taupe">
        Preview only. Your photo stays on this device and is not uploaded or analysed.
      </p>

      {state.kind === "idle" && state.message && (
        <p role="alert" className="rounded-md border border-warning/40 bg-white p-3 text-sm text-ink">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {(state.kind === "idle" || state.kind === "requesting") && (
          <>
            {cameraSupported && (
              <Button type="button" onClick={openCamera} disabled={state.kind === "requesting"}>
                <Camera aria-hidden /> Open camera
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
              <ImageUp aria-hidden /> Upload a photo
            </Button>
          </>
        )}
        {state.kind === "live" && (
          <>
            <Button type="button" onClick={capture}>
              <Camera aria-hidden /> Take photo
            </Button>
            <Button type="button" variant="outline" onClick={cancelCamera}>
              <X aria-hidden /> Close camera
            </Button>
          </>
        )}
        {state.kind === "captured" && (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => (cameraSupported ? openCamera() : fileRef.current?.click())}
            >
              <Camera aria-hidden /> Retake
            </Button>
            <Button type="button" variant="outline" onClick={rotate}>
              <RotateCw aria-hidden /> Rotate
            </Button>
            <Button type="button" variant="outline" onClick={remove}>
              <Trash2 aria-hidden /> Remove photo
            </Button>
            <Button type="button" onClick={async () => setAnalyseOutcome((await analysePhoto()).status === "not-connected" ? "not-connected" : null)}>
              Analyse photo
            </Button>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="user"
          className="sr-only"
          tabIndex={-1}
          aria-label="Upload a photo"
          onChange={onFile}
        />
      </div>

      {rotateFailed && (
        <p role="alert" className="text-center text-sm text-warning">
          This photo format can&apos;t be rotated here. Retake it or upload a JPEG or PNG.
        </p>
      )}

      {analyseOutcome && (
        <ServiceNotice outcome="not-connected" feature="Photo analysis">
          Your photo was not sent anywhere. Your answers are all Glow Scan needs, so continue to the questions — you can
          remove the photo first.
        </ServiceNotice>
      )}
    </div>
  );
}
