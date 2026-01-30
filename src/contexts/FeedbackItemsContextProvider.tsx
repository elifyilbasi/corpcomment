import { useEffect, useState, useMemo, createContext, useContext } from "react";
import type { TFeedbackItem } from "../lib/types";

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectedCompany: (company: string) => void;
};
export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null,
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems],
  );
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany,
          )
        : feedbackItems,
    [selectedCompany, feedbackItems],
  );
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(1).substring(1, 0).toUpperCase(),
    };
    setFeedbackItems([...feedbackItems, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
  };
  const handleSelectedCompany = (company: string) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch {
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <FeedbackItemsContext
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectedCompany,
      }}
    >
      {children}
    </FeedbackItemsContext>
  );
}
