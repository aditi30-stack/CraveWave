

export const Filter = ({handleFilter}) => {
    
    

    return (
      <div className="w-full text-white font-bold p-2 mb-2 p-2">
        <div className="flex justify-center items-center space-x-4 mb-2 mt-4 mb-2">
          <button onClick={()=>{
            handleFilter("all")
          }} className="border-2 rounded-l px-2 py-1">All</button>
          <button onClick={()=>{
            handleFilter("rating")
          }} className="border-2 rounded-lg px-2 py-1">Rating 4.0+</button>
          <button onClick={()=>{
            handleFilter("rupee")
          }} className="border-2 rounded-lg px-2 py-1"> ₹300-600</button>
          <button onClick={()=>{
            handleFilter("bigRupee")
          }} className="border-2 rounded-lg px-2 py-1"> more than ₹600</button>
          <button onClick={()=>{
            handleFilter("lessRupee")
          }} className="border-2 rounded-lg px-2 py-1"> less than ₹300</button>
        </div>
      </div>
    );
  };
  