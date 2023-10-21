import { Text } from "@gravity-ui/uikit";
import { FC } from "react";

interface DateTextProps {
	date: string;
}

export const DateText: FC<DateTextProps> = ({ date }) => (
	<Text>{`${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}</Text>
);
