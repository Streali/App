export const parseLottieText = (json: any) => {
  const fontList = json.fonts.list;

  return json.layers
    .filter((l: any) => l.ty === 5)
    .map((l: any) => {
      const fontName = l.t.d.k[0].s.f;
      const matchedFont = fontList.find((f: any) => f.fName === l.t.d.k[0].s.f);

      return {
        name: l.nm,
        text: l.t.d.k[0].s.t,
        fontName,
        fontFamily: matchedFont ? matchedFont.fFamily : undefined,
        path: `layers.${l.ind - 1}.t.d.k.0.s.t`,
      };
    });
};
