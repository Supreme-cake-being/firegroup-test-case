export const handleSaveError = (error: any, _: any, next: any) => {
  error.status = 400;
  next();
};

export const runValidatorsAtUpdate = function (this: any, next: any) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
