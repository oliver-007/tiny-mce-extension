import RTE from "./components/RTE";

const App = () => {
  return (
    <div className="p-5 bg-black/70 h-screen text-center space-y-20 flex flex-col  justify-center w-full ">
      <h2 className="text-4xl text-zinc-200  ">
        TinyMCE Editor Extension Development
      </h2>

      {/* ------- TinyMCE EDITOr ------- */}
      <div className="shadow-lg shadow-sky-300 rounded-md ">
        <RTE />
      </div>
    </div>
  );
};

export default App;
