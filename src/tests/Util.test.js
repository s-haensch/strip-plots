import * as util from '../components/Util';

const dataSample = [
  {
    city: "Berlin",
    notReligious: 62.56279324,
    ownedHomes: 14.77972396,
    populationChange: -2.45270567,
    populationDensity: 84.23472739,
    selfEmployed: 15.57973715,
  },
  {
    city: "Hamburg",
    notReligious: 48.85539781,
    ownedHomes: 23.25007563,
    populationChange: -7.55535390,
    populationDensity: 49.59492008,
    selfEmployed: 12.85243705,
  },
  {
    city: "Salzgitter",
    notReligious: 31.14724132,
    ownedHomes: 44.16689442,
    populationChange: 13.13428110,
    populationDensity: 7.663674184,
    selfEmployed: 5.198487713,
  },
  {
    city: "Trier",
    notReligious: 16.01720865,
    ownedHomes: 29.50362521,
    populationChange: -14.86241885,
    populationDensity: 19.26866652,
    selfEmployed: 9.727021424,
  },
  {
    city: "Magdeburg",
    notReligious: 83.00122144,
    ownedHomes: 15.98440546,
    populationChange: 9.617572416,
    populationDensity: 18.27738490,
    selfEmployed: 23.47273922,
  },
  {
    city: "Chemnitz",
    notReligious: 82.17314256,
    ownedHomes: 14.50815845,
    populationChange: 9.40848506,
    populationDensity: 18.33899740,
    selfEmployed: 22.44361725,
  },
  {
    city: "Bochum",
    notReligious: 24.98980501,
    ownedHomes: 28.53462207,
    populationChange: 9.663428175,
    populationDensity: 8.70313810,
    selfEmployed: 52.61659733,
  }
];


describe('util', () => {
  describe('createScale', () => {
    it('maps min max values of data key', () => {
      const notRelScale = util.createScale(
        dataSample, "notReligious", [0,1]);

      expect(notRelScale.domain()[0])
        .toEqual(16.01720865) // smallest 'notReligious' value
      expect(notRelScale.domain()[1])
        .toEqual(83.00122144) // highest 'notReligious' value
    });

    // with negative scales
    const popChngScale = util.createScale(
      dataSample, "populationChange", [0,1]);
    expect(popChngScale.domain()[0])
      .toEqual(-14.86241885) // smallest 'populationChange' value
    expect(popChngScale.domain()[1])
      .toEqual(13.13428110)  // highest 'populationChange' value
  });

  describe('createScales', () => {
    it('applies createScale function to multiple data keys', () => {
      const minMaxScales = util.createScales(
        dataSample, ["notReligious", "ownedHomes"], [0,1]);

      expect(minMaxScales["notReligious"].domain()[0])
        .toEqual(16.01720865) // smallest 'notReligious' value
      expect(minMaxScales["ownedHomes"].domain()[0])
        .toEqual(14.50815845) // smallest 'ownedHomes' value
    });
  });

  describe('getCityProps', () => {
    it('applies createScale function to multiple data keys', () => {
      const cityProps = util.getCityProps(dataSample, ["notReligious", "ownedHomes"]),
        magdeburgNotRel = cityProps["Magdeburg"]["notReligious"],
        hamburgNotRel = cityProps["Hamburg"]["notReligious"],
        trierNotRel = cityProps["Trier"]["notReligious"];

      // Magdeburg has highest "notReligious" value
      expect(magdeburgNotRel).toEqual(1)
      
      // Trier has lowest "notReligious" value
      expect(trierNotRel).toEqual(0)
      
      // Hamburgs "notReligious" value is somewhere between Berlin's and Trier's
      expect(magdeburgNotRel > hamburgNotRel > trierNotRel)
        .toEqual(true);

      /*
        mapping goes like:
        var length = highest - lowest; // 83.00 - 16.01 = ​​​​​66.99
        var diff = mapped - lowest;    // 48.85 - 16.01 = ​​​​​32.84

        var value = diff / length      // 32.84 / 66.99 = ~0.49
      */
      expect(hamburgNotRel).toEqual(
        ( dataSample[1]["notReligious"]
          - dataSample[3]["notReligious"])
        /
        ( dataSample[4]["notReligious"]
          - dataSample[3]["notReligious"])
      );
    });
  });

  describe('getCityMatchValue', () => {
    it('returns calculated distance between two cities', () => {
      const cityProps = util.getCityProps(dataSample, ["notReligious", "ownedHomes"]),
        berlinProps = cityProps["Berlin"],    // {  notReligious: 1,
                                              //      ownedHomes: 0 }
        hamburgProps = cityProps["Hamburg"];  //  { notReligious: 0.7055059991029753,
                                              //      ownedHomes: 0.28823297845327844 }
      
      const notRelDistSquared = Math.pow(
        berlinProps["notReligious"]
        - hamburgProps["notReligious"], 2); // 0.0867267165643368
 
      const owndHmsDistSquared = Math.pow(
          berlinProps["ownedHomes"]
          - hamburgProps["ownedHomes"], 2); // 0.08307824986804807
      
      const sqrtOfSum = Math.sqrt(
        notRelDistSquared
        + owndHmsDistSquared);              // 0.41207398174646365

      // distance in two categories is larger than in one category
      expect(sqrtOfSum)
        .toBeGreaterThan(notRelDistSquared);

      // utility function should equal our calculation by hand
      expect(util.getCityMatchValue(
        berlinProps, hamburgProps, ["notReligious", "ownedHomes"]))
        .toEqual(sqrtOfSum)

      // order of cities doesn't matter
      expect(util.getCityMatchValue(
        berlinProps, hamburgProps, ["notReligious", "ownedHomes"]))
        .toEqual(util.getCityMatchValue(
          hamburgProps, berlinProps, ["notReligious", "ownedHomes"]))
    });
  });
});