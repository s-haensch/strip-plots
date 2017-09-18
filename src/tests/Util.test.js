import { csv } from 'd3-request';
import * as util from '../components/Util';

const dataSample = [
  {
    city: "Berlin",
    notReligious: "62.56279324",
    ownedHomes: "14.77972396",
    populationChange: "-2.45270567",
    populationDensity: "84.23472739",
    selfEmployed: "15.57973715",
  },
  {
    city: "Hamburg",
    notReligious: "48.85539781",
    ownedHomes: "23.25007563",
    populationChange: "-7.55535390",
    populationDensity: "49.59492008",
    selfEmployed: "12.85243705",
  },
  {
    city: "Salzgitter",
    notReligious: "31.14724132",
    ownedHomes: "44.16689442",
    populationChange: "13.13428110",
    populationDensity: "7.663674184",
    selfEmployed: "5.198487713",
  },
  {
    city: "Trier",
    notReligious: "16.01720865",
    ownedHomes: "29.50362521",
    populationChange: "-14.86241885",
    populationDensity: "19.26866652",
    selfEmployed: "9.727021424",
  },
];


describe('util', () => {
    describe('createScale', () => {
      it('maps min max values of data key', () => {
        const minMaxScale = util.createScale(
          dataSample, "notReligious", [0,1]);

        expect(minMaxScale.domain()[0])
          .toEqual(16.01720865) // smallest 'notReligious' value
        expect(minMaxScale.domain()[1])
          .toEqual(62.56279324) // biggest 'notReligious' value
      });
    });

    describe('createScales', () => {
      it('applies createScale function to multiple data keys', () => {
        const minMaxScales = util.createScales(
          dataSample, ["notReligious", "ownedHomes"], [0,1]);

        expect(minMaxScales["notReligious"].domain()[0])
          .toEqual(16.01720865) // smallest 'notReligious' value
        expect(minMaxScales["ownedHomes"].domain()[0])
          .toEqual(14.77972396) // smallest 'ownedHomes' value
      });
    });

    describe('getCityProps', () => {
      it('applies createScale function to multiple data keys', () => {
        const cityProps = util.getCityProps(dataSample, ["notReligious", "ownedHomes"]),
          berlinNotRel = cityProps["Berlin"]["notReligious"],
          hamburgNotRel = cityProps["Hamburg"]["notReligious"],
          trierNotRel = cityProps["Trier"]["notReligious"];

        // Berlin has highest "notReligious" value
        expect(berlinNotRel).toEqual(1)
        
        // Trier has lowest "notReligious" value
        expect(trierNotRel).toEqual(0)
        
        // Hamburgs "notReligious" value is somewhere between Berlin's and Trier's
        expect(berlinNotRel > hamburgNotRel > trierNotRel)
          .toEqual(true);
      });
    });
});

