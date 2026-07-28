import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";

export  function MyRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      setLoading(true);

      const response = await API.get("/routes/my");

      console.log("ROUTES:", response.data);

      setRoutes(response.data?.data || []);
    } catch (error) {
      console.error("Routes Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Routes load nahi hui"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/routes/${id}`);

      setRoutes((prev) =>
        prev.filter((route) => route._id !== id)
      );

      toast.success("Route deleted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Route delete nahi hua"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading routes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          My Routes
        </h1>

        {routes.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <h2 className="font-semibold text-lg">
              No Routes Added
            </h2>

            <p className="text-gray-500 mt-2">
              You have not added any transport routes yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {routes.map((route) => (
              <div
                key={route._id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">
                    {route.from}
                  </h2>

                  <span className="text-orange-500">
                    →
                  </span>

                  <h2 className="text-lg font-bold">
                    {route.to}
                  </h2>
                </div>

                {route.vehicleTypes?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Vehicle Types
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {route.vehicleTypes.map(
                        (vehicle, index) => (
                          <span
                            key={index}
                            className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm"
                          >
                            {vehicle}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-5">
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      route.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {route.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(route._id)
                  }
                  className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete Route
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export  default MyRoutes;