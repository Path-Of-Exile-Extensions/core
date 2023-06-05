import {Ext} from "./ext";
import {ExtMessage, ExtMessagePortID} from "./ext-message";
import {Runtime} from "webextension-polyfill";

export function ForwardMessageHandler(ports: Runtime.Port[], message: ExtMessage) {
  const target = message.identify.split(":")[1] as string as ExtMessagePortID;
  const targetPorts = ports.filter(port => port.name.startsWith(target));
  console.log("ForwardMessageHandler", ports, target, targetPorts, message)
  switch (target) {
    case ExtMessagePortID.Popup:
      Ext.message.multicast(targetPorts, message.payload)
      break;
    case ExtMessagePortID.ContentScript:
      Ext.message.multicast(targetPorts, message.payload)
      break;
  }
}
