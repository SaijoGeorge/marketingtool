'use strict'

const fbChart = function(count){
  var facebook = {
      bindto: '#fb-chart',
      data: {
          type : 'donut',
          columns: [
              ['Shares',   count[0]],
              ['Comments', count[1]],
              ['Likes',    count[2]]
          ],
          colors: {
              'Shares':   '#3b5998',
              'Comments': '#3067dc',
              'Likes':    '#528aff'
          }
      }
  };
  c3.generate(facebook);
}

const mtChart = function(score){
  var mtDetails = {
      bindto: '#mt-chart',
      data: {
          type: 'gauge',
          columns: [ ['Score', score] ],
          color() { return ' #00AAFF' }
      },
      gauge: {
          width: 38,
          label: {
              format(value) { return value }
          },
          units: '',
      },
      size: {
          height: 180
      }
  }
  c3.generate(mtDetails)
}

const allChart = function(count){

  var socialCount = {
       bindto: '#all-chart',
       data: {
           type : 'donut',
           columns: [
               ['Facebook shares',    count[0]],
               ['Facebook comments',  count[1]],
               ['Facebook likes',     count[2]],
               ['Google Plus shares', count[3]],
               ['LinkedIn shares',    count[4]],
               ['Pinterest',          count[5]],
               ['StumbleUpon',        count[6]],
               ['Buffer',             count[7]],
               ['Reddit',             count[8]],
               ['Odnoklassniki',      count[9]],
               ['Mail.ru',            count[10]],
               ['VKontakte',          count[11]],
               ['Twitter',            count[12]]
           ],
           colors: {
               'Facebook shares':    '#3b5998',
               'Facebook comments':  '#3b5998',
               'Facebook likes':     '#3b5998',
               'Google Plus shares': '#dd4b39',
               'LinkedIn shares':    '#0077b5',
               'Pinterest':          '#bd081c',
               'StumbleUpon':        '#eb4924',
               'Buffer':             '#168eea',
               'Reddit':             '#ff4500',
               'Odnoklassniki':      '#ed812b',
               'Mail.ru':            '#168de2',
               'VKontakte':          '#45668e',
               'Twitter':            '#1da1f2'
           }
       },
       pie: {
           label: {
               show: false
           }
       }
   };

   c3.generate(socialCount);
}
