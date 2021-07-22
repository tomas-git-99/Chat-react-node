import React from "react";
import { InconmingMessage } from "./InconmingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {

    const msgs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history">

          {
              msgs.map((msg) => (
                  (msg % 2 )
                      ?  <InconmingMessage  key={msg}/>
                      :  <OutgoingMessage   key={msg}/>
              ))
          }


        
      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />
    </div>
  );
};
