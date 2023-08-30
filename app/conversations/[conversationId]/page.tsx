import getMessages from "@/app/actions/getMessages";
import getConversationById from "./../../actions/getConversationById";
import EmptyState from "./../../components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        {conversation ? (
          <>
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <Form />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ConversationId;
