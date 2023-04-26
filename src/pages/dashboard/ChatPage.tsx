import { Helmet } from 'react-helmet-async';
// sections
import { Chat } from '../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Helmet>
        <title> Chat | VietELite Education</title>
      </Helmet>

      <Chat />
    </>
  );
}
