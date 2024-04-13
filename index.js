const { platform, arch } = process;

let nativeBinding = null;
let loadError = null;

switch (platform) {
  case "darwin":
    switch (arch) {
      case "x64":
        try {
          nativeBinding = require("@anysphere/tiktoken-node-darwin-x64");
        } catch (e) {
          loadError = e;
        }
        break;
      case "arm64":
        try {
          nativeBinding = require("@anysphere/tiktoken-node-darwin-arm64");
        } catch (e) {
          loadError = e;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`);
    }
    break;
  case "freebsd":
    if (arch !== "x64") {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
    }
    throw new Error("Unsupported OS: freebsd");
  case "linux":
    switch (arch) {
      case "x64":
        try {
          nativeBinding = require("@anysphere/tiktoken-node-linux-x64-gnu");
        } catch (e) {
          loadError = e;
        }
        break;
      case "arm64":
        try {
          nativeBinding = require("@anysphere/tiktoken-node-linux-arm64-gnu");
        } catch (e) {
          loadError = e;
        }
        break;
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`);
    }
    break;
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError;
  }
  throw new Error(`Failed to load native binding`);
}

const {
  SupportedEncoding,
  Tokenizer,
  SpecialTokenAction,
  SyncTokenizer,
  getTokenizer,
} = nativeBinding;

module.exports.SupportedEncoding = SupportedEncoding;
module.exports.Tokenizer = Tokenizer;
module.exports.SpecialTokenAction = SpecialTokenAction;
module.exports.SyncTokenizer = SyncTokenizer;
module.exports.getTokenizer = getTokenizer;
