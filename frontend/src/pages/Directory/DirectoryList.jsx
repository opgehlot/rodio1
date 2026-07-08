import DirectoryCard from "./DirectoryCard";

function DirectoryList({ data, loading }) {

  if (loading) {

    return <h2 className="mt-10">Loading...</h2>;

  }

  if (!data.length) {

    return <h2 className="mt-10">No Data Found</h2>;

  }

  return (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

      {data.map((business) => (

        <DirectoryCard

          key={business._id}

          business={business}

        />

      ))}

    </div>

  );

}

export default DirectoryList;