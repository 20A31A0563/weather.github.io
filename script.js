const app = Vue.createApp({
   data() {
      return {
         api: "D0mGXlMSI9kRGGVmkl2PPv97yuUCGIEF",
         cities: [],
         selected_city: "Hyderabad",
         res_temp: "27.5",
         res_time: '2024-02-03T23:25:00+10:00',
         res_text: 'Partly cloudy',
         load_dis: false
      };
   },
   mounted() {
      window.addEventListener("load", () => this.gettopcities());
   },
   methods: {

      async gettopcities() {
         const url =
            ` http://dataservice.accuweather.com/locations/v1/topcities/` +
            `?apikey=${this.api}`;
         const response = await fetch(url);
         const data = await response.json();
         for (var i = 0; i < data.length; i++) {
            this.cities.push(data[i]["EnglishName"]);
         }
         console.log(this.cities);
      },
      async getcity() {
         this.load_dis = true;
         setTimeout(() => {
            this.load_dis = false
         }, 2000)

         const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
         const url = `?apikey=${this.api}&q=${this.selected_city}`;
         const response = await fetch(base + url);
         const data = await response.json();
         console.log(data[0])
         this.getweather(data[0]['Key']);
      },
      async getweather(id) {
         const base = `http://dataservice.accuweather.com/currentconditions/v1/${id}` + `?apikey=${this.api}`
         const response = await fetch(base);
         const data = await response.json();
         console.log(data[0]['Temperature']['Metric']['Value']);
         console.log(data[0]['WeatherText']);
         console.log(data[0]['LocalObservationDateTime'])
         this.res_temp = data[0]['Temperature']['Metric']['Value']
         this.res_time = data[0]['LocalObservationDateTime']
         this.res_text = data[0]['WeatherText']
      }
   },
}).mount("#app");