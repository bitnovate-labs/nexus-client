import image from "../../assets/maintenancepage.png";

const MaintenancePage = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-start pt-32 h-screen bg-white dark:bg-gray">
      {/* Image */}
      <div>
        <img
          src={image}
          alt="maintenance_page_image"
          width={300}
          className="mb-10"
        />
      </div>
      <h1 className="text-3xl font-bold py-6">{pageName}</h1>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue dark:text-white">
          Page Under Maintenance
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;re currently making improvements to this page. Please check
          back later.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
