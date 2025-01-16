import Calendar from "./components/Calendar";

const Events = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4 md:flex md:justify-between items-center lg:mb-6">
        <h1 className="text-2xl font-bold ml-2">Events</h1>
      </div>
      <Calendar />
    </>
  );
};

export default Events;
