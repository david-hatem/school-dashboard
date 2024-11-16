import { formatDateToYYYYMMDD } from "@/lib/utils";

const Announcements = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Paiements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data != null &&
          data.map((item) => (
            <div className="bg-lamaSkyLight rounded-md p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{item?.groupe}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {formatDateToYYYYMMDD(item?.date_paiement)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {item?.montant} MAD - {item?.statut_paiement}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Announcements;
