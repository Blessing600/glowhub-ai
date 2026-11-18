import { entitlementRows, plans } from "@/config/pricing";

/** Plan entitlements: a table from md up, stacked cards on phones (brief §15). */
export function PlanComparison() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border bg-white md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Features included in each plan</caption>
          <thead className="bg-blush">
            <tr>
              <th scope="col" className="p-4 font-semibold">
                Feature
              </th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col" className="p-4 font-semibold">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {entitlementRows.map((row) => (
              <tr key={row.feature}>
                <th scope="row" className="p-4 font-medium">
                  {row.feature}
                </th>
                {plans.map((plan) => (
                  <td key={plan.id} className="p-4 text-plum-600">
                    {row.values[plan.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {entitlementRows.map((row) => (
          <li key={row.feature} className="rounded-xl border bg-white p-4">
            <h3 className="text-sm font-semibold">{row.feature}</h3>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              {plans.map((plan) => (
                <div key={plan.id} className="contents">
                  <dt className="text-plum-600">{plan.name}</dt>
                  <dd>{row.values[plan.id]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
