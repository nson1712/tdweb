const withIconTitle = (IconComponent, title) => {
  return function WrappedComponent() {
    return (
      <div className="flex gap-x-2">
        <IconComponent className="self-center" />
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
      </div>
    );
  };
};

export default withIconTitle;
