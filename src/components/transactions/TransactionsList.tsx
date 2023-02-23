import { CategoryType } from "../../models/CategoryType";
import { classNames, formatCurrency, formatDate } from "../../utils";

export default function TransactionsList({ items }) {
  return (
    <>
      {items && (
        <>
          <ul role="list" className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex p-4 bg-white">
                <div className="flex w-full items-end">
                  <div>
                    <div className="text-lg text-gray-900 flex items-center">
                      <div className="font-bold">{item.name}</div>
                      <div className="mx-2 text-sm text-gray-500">|</div>
                      <div className="text-sm text-gray-500">
                        {item.category}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      item.type === CategoryType.Income
                        ? "text-green-600"
                        : "text-red-600",
                      "ml-auto text-lg font-bold"
                    )}
                  >
                    {(item.type === CategoryType.Income ? "+" : "-") +
                      formatCurrency(item.amount)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
