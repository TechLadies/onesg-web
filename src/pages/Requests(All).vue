<template>
  <div class="main">
    <div class="title">Requests</div>
    <div class="approvedlist">Only approved requests are listed here</div>

    <div class="row"> 
      <div class="rounded">
          <div class="text">Case Status</div>          
      </div>
      <div class="rounded">          
          <div class="text">Request Type</div>
      </div>
      <div class="downloadicon">          
          <img src="../icon/download_24px.png" width="10" height="10">
      </div>

      <div class="text1">EXPORT ALL</div>

    </div>
  
    <div class="fields">
      <div class="fieldname">Case #</div>
      <div class="fieldname">Request Type</div>
      <div class="fieldname">Fufilment</div>
      <div class="fieldname">Progress</div>

      <div class="fieldname">Beneficiary Name</div>
      <div class="fieldname">Applied on</div>
      <div class="fieldname">Approved on</div>
      <div class="fieldname">Completed on</div>
    </div>

    <div class="tableheaderline"></div>

  </div>

  
        
</template>

<style scoped>
.main {
  margin-left: 10%;
  margin-right: 10%;  
  text-align: left;
  padding: 0px 0px 0px 20px;
}

.title {  
  width: 702px;
  left: 112px;
  top: 25px;
  border-radius: nullpx;
  margin-bottom: 1%
}

.approvedlist {
   text-align: left;
   margin-bottom: 0%;
   font-size: 12px;
}

.row {
  display: flex;  
  flex-direction: row; 
  justify-content: left;
  padding: 2px 0px 0px 1px;
  margin-left: 1px;
  margin-top: 1%;
  margin-right: 2%;
}

.rounded {
  /*position: absolute;*/
  width: 103px;
  height: 22px;
  left: 90px;
  top: 111px;
  margin-right: 1%;
  /* White */
  background: #f5f3f3;
  /* Light Gray */
  border: 1px solid #E6E6F0;
  box-sizing: border-box;
  border-radius: 290486px;

  /* White */
  background: #FFFFFF;
  /* Light Gray */
  border: 1px solid #E6E6F0;
  box-sizing: border-box;
  border-radius: 290486px;
}

.text {
  position: static;
  width: 102px;
  height: 20px;
  left: 34px;
  top: 6px;

  /* Roboto 14px Regular */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  text-align: center;
  /* Dark Gray */
  color: #59596E;
  /* Inside Auto Layout */

  flex: none;
  order: 0;
  align-self: flex-end;
  flex-grow: 0;
  margin: 0px 0px;
}

.text1 {
  position: static;
  width: 102px;
  height: 20px;
  margin-left: 10px;
  top: 6px;
  justify-content: flex-end;

  /* Roboto 14px Regular */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* Dark Gray */
  color: #59596E;
}

.fields {
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 0px 0px 4px;
  margin-left: 1px;
  margin-top: 1%;
  margin-right: 0%;
}

.downloadicon {
  justify-content: right;
}

.tableheaderline {  
  position: absolute;
  left: 5.56%;
  right: 0%;
  top: 38%;
  bottom: 77.89%;
  /* Light Gray */
  border: 2px solid #E6E6F0;
}

</style>
