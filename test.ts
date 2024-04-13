import { SpecialTokenAction, SupportedEncoding, getTokenizer } from "./index";

const tokenizer = getTokenizer();

const tokensInSydney = await tokenizer.exactNumTokens(
  "syndney",
  SupportedEncoding.Cl100k,
  SpecialTokenAction.NormalText,
  {}
);

console.log("Tokens in Sydney:", tokensInSydney);
