const response = {
    responseStatus: 0,
    body: null,
    status: function(rstatus) {
      // eslint-disable-next-line no-invalid-this
      this.responseStatus= rstatus;
      return this;
    },
    json: function(json) {
      this.body= json;
      return this;
    },
  };
  
  module.exports={response}
  