import {
  useEffect,
  useState,
} from "react";

import {
  FileText,
  ExternalLink,
  Trash2,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";
import API from "../../api/api";

export function MyDocuments() {
  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const { data } =
        await API.get(
          "/documents/my"
        );

      setDocuments(
        data.data || []
      );
    } catch (error) {
      console.error(
        "GET DOCUMENTS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to load documents"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } =
        await API.delete(
          `/documents/${id}`
        );

      toast.success(
        data.message ||
          "Document deleted"
      );

      setDocuments((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete document"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">

        <Loader2
          size={35}
          className="animate-spin text-orange-500"
        />

      </div>
    );
  }

  return (
    <div>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          My Documents
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your uploaded documents
        </p>

      </div>

      {documents.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-12 text-center">

          <FileText
            size={50}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-xl font-bold mt-4">
            No Documents
          </h2>

          <p className="text-gray-500 mt-1">
            You haven't uploaded any documents.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {documents.map((doc) => (

            <div
              key={doc._id}
              className="
                bg-white
                rounded-2xl
                shadow
                border
                p-6
              "
            >

              <div className="flex justify-between">

                <div className="bg-orange-100 p-3 rounded-xl">

                  <FileText className="text-orange-500" />

                </div>

                <span
                  className={`
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                    h-fit

                    ${
                      doc.verificationStatus ===
                      "verified"
                        ? "bg-green-100 text-green-700"
                        : doc.verificationStatus ===
                          "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {doc.verificationStatus}

                </span>

              </div>

              <h2 className="font-bold text-lg mt-4 capitalize">
                {doc.documentName ||
                  doc.documentType}
              </h2>

              <p className="text-gray-500 text-sm capitalize">
                {doc.documentType}
              </p>

              <div className="flex gap-3 mt-5">

                <a
                  href={doc.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex-1
                    bg-orange-50
                    text-orange-600
                    rounded-xl
                    py-2
                    flex
                    justify-center
                    items-center
                    gap-2
                    font-semibold
                  "
                >
                  <ExternalLink size={16} />

                  View
                </a>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      doc._id
                    )
                  }
                  className="
                    bg-red-50
                    text-red-600
                    rounded-xl
                    px-4
                  "
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
export default MyDocuments;