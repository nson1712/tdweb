const withIconTitle = (IconComponent, title) => {
  return function WrappedComponent() {
    return (
      <h2 className="flex gap-x-2">
        <IconComponent className="self-center" />
        <div className="text-lg sm:text-xl font-bold">{title}</div>
      </h2>
    );
  };
};

export default withIconTitle;
