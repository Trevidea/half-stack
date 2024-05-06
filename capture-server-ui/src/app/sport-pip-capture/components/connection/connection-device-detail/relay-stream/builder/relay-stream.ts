import { AbstractBuilder } from "app/blocks/strategies";
import { RelayStreamView, SharedWithView } from "../views/relay-stream";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { Transformer } from "app/blocks/transformer";

export class RelayStreamBuilder extends AbstractBuilder<
  Data.RelayStream,
  RelayStreamView
> {
  compose(m: Data.RelayStream, v: RelayStreamView) {
    v.eventName = m.eventName;
    Transformer.ComposeCollection(
      m.sharedWith,
      v.sharedWith,
      SharedWithBuilder
    );
  }
  decompose(v: RelayStreamView): Data.RelayStream {
    return {
      id: v.id,
      eventName: v.eventName,
      sharedWith: Transformer.DecomposeCollection(
        v.sharedWith,
        SharedWithBuilder
      ),
      eventId: v.eventId,
    };
  }
  view(): RelayStreamView {
    return new RelayStreamView();
  }
}

export class SharedWithBuilder extends AbstractBuilder<
  Data.SharedWith,
  SharedWithView
> {
  compose(m: Data.SharedWith, v: SharedWithView) {
    v.id = m.id;
    v.name = m.name;
    v.url = m.url;
  }
  decompose(v: SharedWithView): Data.SharedWith {
    return {
      id: v.id,
      url: v.url,
      name: v.name,
    };
  }
  view(): SharedWithView {
    return new SharedWithView();
  }
}
