import TransportSearch from "./TransportSearch";
import Leads from "../Dashboard/transporter/Leads";

export default function DaynamicHomeComponent({ activeTab }) {
  return (
    <>
      {activeTab === "search" ? (
        <TransportSearch />
      ) : (
        <Leads />
      )}
    </>
  );
}