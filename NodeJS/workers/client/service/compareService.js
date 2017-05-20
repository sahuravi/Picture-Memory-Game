myApp.service('compareService', function() {
    
  // var phoneCompareList = null;

  // var SetphoneCompareList = function(phoneList) {
  //     phoneCompareList = phoneList;
  // };

  // var GetphoneCompareData = function() {
  //     var data = {};
  //     data.phonesCompared = phoneCompareList;
  //     data.comparision = getComparisionData(data.phonesCompared);
  //     return data;
  // };

  // var clearphoneCompareList = function(phoneList) {
  //     phoneCompareList = null;
  // };

  // var getComparisionData = function(phoneList) {
  //     var prop = ['id','name','image','comparable'];
  //     var data = {};
  //     for(var i=0; i<phoneList.length; i++){
  //       for(var property in phoneList[i]){
  //         if(prop.indexOf(property) === -1){
  //           data[property] = [];
  //           for(var k=0; k<phoneList.length; k++){
  //             if(phoneList[k][property].toString()){
  //               data[property].push(phoneList[k][property].toString());
  //             }
  //             else{
  //               data[property].push("-"); 
  //             }
  //           }
  //           prop.push(property);
  //         }
  //       }
  //     }
  //     return data;
  // };

  // return {
  //   SetphoneCompareList: SetphoneCompareList,
  //   GetphoneCompareData: GetphoneCompareData,
  //   clearphoneCompareList: clearphoneCompareList
  // };

});