export const PAGE_SIZE = 5;
export const PAGE_INDEX = 0;
export const API_KEY = '18a3b0ac7908497e8fb88bcc4ce9416e';
export const FIRST_PAGE = 1;

export function getPublishers(articles, publishers){
    for (let i = 0; i < articles.length; i++){
        let flag = false;
        for (let j = 0; j < publishers.length; j++ ){
          if (publishers[j].name === articles[i].source.name){
            publishers[j].count = publishers[j].count + 1;
            flag = true;
          }
        }
    
        if (!flag){
          publishers.push({name: articles[i].source.name, count: 1});
        }
          
    }

    publishers.sort(function(a, b){
        return b.count - a.count;
    });

};
