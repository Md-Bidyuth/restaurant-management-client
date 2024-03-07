const Cover = ({ img, title }) => {
  return (
    <div
      className="hero h-[500px]"
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className="hero-overlay bg-opacity-10"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="w-3/4 mx-auto hero-overlay bg-opacity-70 px-24 py-10 mt-8">
          <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
