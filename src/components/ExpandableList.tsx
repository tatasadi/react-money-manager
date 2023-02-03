import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ExpandableList({ items }) {
  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="flex p-4 bg-white">
            <div className="flex w-full">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <button
                type="button"
                className="ml-auto flex items-center rounded-full p-1 text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="ml-2 flex items-center rounded-full p-1 text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4 flex items-center justify-center">
        <button className=" rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Add New
        </button>
      </div>
    </>
  );
}
