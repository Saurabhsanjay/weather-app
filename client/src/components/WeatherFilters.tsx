import React from "react";

interface WeatherFiltersProps {
  locations: string[];
  fromDate: string;
  toDate: string;
  location: string;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
  setLocation: (value: string) => void;
  onFilter: () => void;
}

const WeatherFilters: React.FC<WeatherFiltersProps> = ({
  locations,
  fromDate,
  toDate,
  location,
  setFromDate,
  setToDate,
  setLocation,
  onFilter,
}) => {
 
  const getMaxToDate = (): string | undefined => {
    if (!fromDate) return undefined;
    const from = new Date(fromDate);
    from.setDate(from.getDate() + 30); 
    return from.toISOString().split("T")[0]; 
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Weather History Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min={fromDate || ""}
            max={getMaxToDate() || ""}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!fromDate} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={onFilter}
        disabled={!fromDate || !toDate || !location}
        className={`mt-4 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          fromDate && toDate && location
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default WeatherFilters;
