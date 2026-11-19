import { createContext, useContext } from "react";

// Lets any "Get CV" trigger open the CV overlay without prop drilling.
// openCv(event) prevents the link's default navigation and remembers the
// trigger so focus can return to it on close.
export const CvContext = createContext({ openCv: () => {} });

export const useCv = () => useContext(CvContext);
