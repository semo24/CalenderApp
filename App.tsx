import React from "react";
import { Calendar, LocaleConfig, } from "react-native-calendars";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import axios from 'axios';

async function anniData(month: number, date: number, category: string) {
  const getData = async (month: number=1, date: number=1, category: string) => {  // 월, 일, 기념일 or 사건
    try {
      let data = {
        "month": month,
        "date": date,

      }
      const response = await axios.post('https://saradan.pythonanywhere.com/api/wiki',
        data,
        {
          headers: {
            "Content-type": "application/json"
          }
        });
      const parsedData = await response.data[category]
      const Data= JSON.stringify(parsedData)
      console.log(typeof response.data.기념일);
      return (
        Data
      );
      
    } catch (error) {
      console.error(error);
      return (
        "error"
      );
    }
  }
  //const response = await axios.get ('https://raw.githubusercontent.com/csk200387/AnniversaryNoti/main/test.json');
  let parsedData = new Array(await getData(month, date, category));
  //parsedData= JSON.stringify(parsedData);
  //const parsedData = await response.data[category][0];
  return (
    parsedData
  );
}

// api 저장
const data = new Array(anniData(11, 11, "기념일"));
const dataLength = data.length ;
export function CalendarView() { //캘린더 출력
  return (
    <SafeAreaView>
      <View>
        <Text></Text>
        <Text></Text>
      </View>
      <Calendar style={styles.calendar}
        monthFormat={'yyyy년 MMMM'} theme={{}}

      />
      <View >
        <Text style={styles.anniStyles}>

        </Text>
      </View>
    </SafeAreaView>
  );
}


LocaleConfig.locales['kor'] = { //언어설정 : 한국어
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],

}
LocaleConfig.defaultLocale = 'kor'; // 기본 언어 한국어로 설정
const styles = StyleSheet.create({ //스타일 모음
  calendar: { // 캘린더 스타일
    borderBottomWidth: 10, //밑면 여백
    borderBottomColor: '#86469C', //밑면 색깔
    margin: 3, //캘린더 여백
    borderRadius: 15, //모서리 둥근 정도
    textDayFontWeight: '500',
    arrowColor: '#86469C',
    calendarBackground: '#86469C'
  },
  anniStyles: {
    fontSize: 17,

  }
});

/*const theme= ({

});*/
type Theme = {

};


export default CalendarView;
