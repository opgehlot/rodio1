import { useForm } from "react-hook-form";

export function AddVehicle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Files
    formData.set("rcBook", data.rcBook[0]);
    formData.set("insurance", data.insurance[0]);
    formData.set("fitness", data.fitness[0]);
    formData.set("permit", data.permit[0]);
    formData.set("pollution", data.pollution[0]);
    formData.set("vehiclePhoto", data.vehiclePhoto[0]);

    // API Call
    // await API.post("/transporter/add-vehicle", formData);

    reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-8">Add Vehicle</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Vehicle Number */}

        <div>
          <label>Vehicle Number</label>

          <input
            className="w-full border rounded p-3"
            placeholder="MP04AB1234"
            {...register("vehicleNumber", {
              required: "Vehicle Number is required",
            })}
          />

          <p className="text-red-500 text-sm">
            {errors.vehicleNumber?.message}
          </p>
        </div>

        {/* Vehicle Type */}

        <div>
          <label>Vehicle Type</label>

          <select
            className="w-full border rounded p-3"
            {...register("vehicleType", {
              required: "Vehicle Type required",
            })}
          >
            <option value="">Select</option>
            <option>Truck</option>
            <option>Container</option>
            <option>Tanker</option>
            <option>Pickup</option>
            <option>Trailer</option>
          </select>

          <p className="text-red-500 text-sm">{errors.vehicleType?.message}</p>
        </div>

        {/* Capacity */}

        <div>
          <label>Capacity (Ton)</label>

          <input
            type="number"
            className="w-full border rounded p-3"
            {...register("capacity", {
              required: "Capacity required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.capacity?.message}</p>
        </div>

        {/* Driver Name */}

        <div>
          <label>Driver Name</label>

          <input
            className="w-full border rounded p-3"
            {...register("driverName", {
              required: "Driver Name required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.driverName?.message}</p>
        </div>

        {/* Driver Mobile */}

        <div>
          <label>Driver Mobile</label>

          <input
            className="w-full border rounded p-3"
            {...register("driverMobile", {
              required: "Driver Mobile required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Invalid Mobile Number",
              },
            })}
          />

          <p className="text-red-500 text-sm">{errors.driverMobile?.message}</p>
        </div>

        {/* Source */}

        <div>
          <label>Source City</label>

          <input
            className="w-full border rounded p-3"
            {...register("source", {
              required: "Source required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.source?.message}</p>
        </div>

        {/* Destination */}

        <div>
          <label>Destination City</label>

          <input
            className="w-full border rounded p-3"
            {...register("destination", {
              required: "Destination required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.destination?.message}</p>
        </div>

        {/* RC */}

        <div>
          <label>RC Book</label>

          <input
            type="file"
            className="w-full"
            {...register("rcBook", {
              required: "RC Book required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.rcBook?.message}</p>
        </div>

        {/* Insurance */}

        <div>
          <label>Insurance</label>

          <input
            type="file"
            className="w-full"
            {...register("insurance", {
              required: "Insurance required",
            })}
          />
        </div>

        {/* Fitness */}

        <div>
          <label>Fitness Certificate</label>

          <input type="file" className="w-full" {...register("fitness")} />
        </div>

        {/* Permit */}

        <div>
          <label>Permit</label>

          <input type="file" className="w-full" {...register("permit")} />
        </div>

        {/* PUC */}

        <div>
          <label>PUC Certificate</label>

          <input type="file" className="w-full" {...register("pollution")} />
        </div>

        {/* Vehicle Photo */}

        <div>
          <label>Vehicle Photo</label>

          <input type="file" className="w-full" {...register("vehiclePhoto")} />
        </div>

        <div className="md:col-span-2">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddVehicle;
