import TransportSearch from "./TransportSearch";
import Directory from "./Directory";

export default function DaynamicHomeComponent({ activeTab }) {
  return (
    <>
      {activeTab === "search" ? (
        <TransportSearch />
      ) : (
        <Directory />
      )}
    </>
  );
}