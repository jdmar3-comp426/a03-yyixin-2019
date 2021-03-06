import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: 
    {   city: mpg_data.map(car => {
            return car.city_mpg;
        }).reduce((a, b) => a + b) / mpg_data.length,
        highway: mpg_data.map(car => {
            return car.highway_mpg;
        }).reduce((a, b) => a + b) / mpg_data.length,
    },
    allYearStats: getStatistics(mpg_data.map(car => {
        return car.year;
      })),
    ratioHybrids: mpg_data.filter(car => {
        return car.hybrid;
      }).length / mpg_data.length
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: 
        mpg_data.filter(car => {
            return car.hybrid;
        })).reduce(function (acc, obj) {
            let key = obj['make']
            if (!acc[key]) {
                acc[key] = {
                    "make": key,
                    "hybrids": []
                }
            }
            acc[key]['hybrids'].push(obj['id'])
            return acc
        }, {}),
    avgMpgByYearAndHybrid: 
        mpg_data.reduce(function (acc, obj) {
            let key = obj['year']
            if (!acc[key]) {
                acc[key] = {
                    hybrid: {
                        city: 0,
                        highway: 0
                    },
                    notHybrid: {
                        city: 0,
                        highway: 0
                    }
                }
            }
            if (obj['hybrid']) {
                acc[key]['hybrid']['city'] = obj['city_mpg'] +acc[key]['hybrid']['city']
                acc[key]['hybrid']['highway'] = obj['highway_mpg'] +acc[key]['hybrid']['highway']
            } else {
                acc[key]['notHybrid']['city'] = obj['city_mpg'] +acc[key]['notHybrid']['city']
                acc[key]['notHybrid']['highway'] = obj['highway_mpg'] +acc[key]['notHybrid']['highway']
            }
            return acc
        }, {})
};
