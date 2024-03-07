const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-1/3 mx-auto text-center">
      <p className="text-lg text-green-500 mb-2">--- {subHeading} ---</p>
      <h2 className="text-4xl border-y-2 py-3 uppercase"> {heading} </h2>
    </div>
  );
};

export default SectionTitle;
