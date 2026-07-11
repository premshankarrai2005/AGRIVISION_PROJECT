interface Props {
  currentStatus: string;
}

const steps = [
  "Pending",
  "Accepted",
  "Packed",
  "Shipped",
  "Delivered",
];

export default function FarmerOrderTimeline({
  currentStatus,
}: Props) {
  const current =
    steps.indexOf(currentStatus);

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-8 text-xl font-bold">
        Order Progress
      </h2>

      <div className="flex justify-between">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex flex-col items-center"
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${
                index <= current
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            <span
              className={`mt-3 text-sm ${
                index <= current
                  ? "text-green-700 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}