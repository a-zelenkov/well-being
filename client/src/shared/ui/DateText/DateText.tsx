import { Text } from "@gravity-ui/uikit";
import { FC } from "react";

interface DateTextProps {
	date: Date;
}

export const DateText: FC<DateTextProps> = ({ date }) => (
	<Text>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Text>
);
