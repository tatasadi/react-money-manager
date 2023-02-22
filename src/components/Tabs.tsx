import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../utils";

export default function Tabs({ tabs, selectValue, updateTab }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    updateTab(pathname.split("/").at(-1));
  }, []);

  function handleSelectChange(e) {
    const newTab = e.target.value.toLowerCase();
    navigate(newTab);
    updateTab(newTab);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="py-4">
        <div className="rounded-lg border border-gray-200">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full p-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={selectValue}
              onChange={handleSelectChange}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <NavLink
                    key={tab.name}
                    to={tab.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm"
                      )
                    }
                    onClick={() => updateTab(tab.href.toLocaleLowerCase())}
                  >
                    {tab.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
