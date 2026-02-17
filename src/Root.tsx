import "./index.css";
import { Composition } from "remotion";
import {
  Placeholder,
  PlaceholderScreen,
  PlaceholderSocial,
} from "./PlaceholderComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Placeholder"
        component={Placeholder}
        durationInFrames={600}
        fps={30}
        width={750}
        height={750}
      />
      <Composition
        id="PlaceholderScreen"
        component={PlaceholderScreen}
        durationInFrames={600}
        fps={30}
        width={750}
        height={750}
      />
      <Composition
        id="PlaceholderSocial"
        component={PlaceholderSocial}
        durationInFrames={600}
        fps={30}
        width={750}
        height={750}
      />
    </>
  );
};
