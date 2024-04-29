import { Observable } from "rxjs";
import { Collection, Range } from "./collection";
import { CollectionItemView, SelectItemView } from "./collection-item";
import {
  AbstractBuilder,
  CollectionStrategy,
  ObjectStrategy,
  SerializerStrategy,
} from "./strategies";

export class Transformer {
  static ComposeAndSelect(collection: Collection<string>, newItem: string) {
    collection.Add(newItem);

    collection.SelectedItem = newItem;
  }

  static ComposeAndSelectItemView(
    collection: Collection<SelectItemView>,
    id: number,
    label: string
  ) {
    const newItem: SelectItemView = new SelectItemView(id, label);
    collection.Add(newItem);
    collection.SelectedItem = newItem;
  }
  static ComposeAndSelectItem<M, V, T extends AbstractBuilder<M, V>>(
    collection: Collection<V>,
    data: M,
    view: V,
    builder: new () => T
  ): Promise<V> {
    let promise: Promise<V> = new Promise<V>((resolve, reject) => {
      let od: ObjectStrategy<M, V, T> = new ObjectStrategy(view, builder);
      od.compose(data);
      collection.Add(view);
      collection.SelectedItem = view;
      resolve(view);
    });
    return promise;
  }

  constructor() {}

  static ComposeCollectionAsync<M, V, T extends AbstractBuilder<M, V>>(
    data: Observable<M[]>,
    view: Range<V>,
    builder: new () => T
  ): Promise<M[]> {
    let promise: Promise<M[]> = new Promise<M[]>((resolve, reject) => {
      let cd: CollectionStrategy<M, V, T> = new CollectionStrategy(
        view,
        builder
      );
      data.subscribe(
        (models: M[]) => {
          resolve(models);
          cd.compose(models);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  static ComposeCollectionViewAsync<M, K, V>(
    data: Observable<M[]>,
    view: Range<CollectionItemView<K, V>>,
    builder: { (modelItem: M): CollectionItemView<K, V> }
  ): Promise<M[]> {
    let promise: Promise<M[]> = new Promise<M[]>((resolve, reject) => {
      view.Clear();
      data.subscribe(
        (models: M[]) => {
          models.forEach((model: M) => {
            view.Add(builder(model));
          });
          resolve(models);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  static ComposeCollection<M, V, T extends AbstractBuilder<M, V>>(
    models: M[],
    view: Range<V>,
    builder: new () => T
  ): void {
    let cd: CollectionStrategy<M, V, T> = new CollectionStrategy(view, builder);
    cd.compose(models);
  }
  static DecomposeCollection<M, V, T extends AbstractBuilder<M, V>>(
    view: Range<V>,
    builder: new () => T
  ): M[] {
    let cd: CollectionStrategy<M, V, T> = new CollectionStrategy(view, builder);
    return cd.decompose();
  }
  static ComposeObjectAsync<M, V, T extends AbstractBuilder<M, V>>(
    data: Observable<M>,
    view: V,
    builder: new () => T
  ): Promise<M> {
    let promise: Promise<M> = new Promise<M>((resolve, reject) => {
      let od: ObjectStrategy<M, V, T> = new ObjectStrategy(view, builder);
      var modelData!: M;
      data.subscribe(
        (model: M) => {
          modelData = model;
        },
        (err) => {
          console.log(err);
          reject(err);
        },
        () => {
          od.compose(modelData);
          resolve(modelData);
        }
      );
    });
    return promise;
  }

  static ComposeObject<M, V, T extends AbstractBuilder<M, V>>(
    model: M,
    view: V,
    builder: new () => T
  ) {
    let od: ObjectStrategy<M, V, T> = new ObjectStrategy(view, builder);
    od.compose(model);
  }
  static DecomposeObject<M, V, T extends AbstractBuilder<M, V>>(
    view: V,
    builder: new () => T
  ): M {
    let od: ObjectStrategy<M, V, T> = new ObjectStrategy(view, builder);
    return od.decompose();
  }
  static Serialize<M, V, T extends AbstractBuilder<M, V>>(
    view: V,
    serializer: { (model: M): Observable<M> },
    builder: new () => T,
    response: { (through: boolean, data: M, err: any): void } = null
  ): SerializerStrategy<M, V, T> {
    let srlz: SerializerStrategy<M, V, T> = new SerializerStrategy(
      view,
      serializer,
      builder
    );
    srlz.serialize(response);
    return srlz;
  }

// this is for just testing  becouse live event comming continuously  
  static _ComposeLiveObjectAsync<M, V, T extends AbstractBuilder<M, V>>(
    data: Observable<M>,
    view: V,
    builder: new () => T
  ): Promise<M> {
    let promise: Promise<M> = new Promise<M>((resolve, reject) => {
      let od: ObjectStrategy<M, V, T> = new ObjectStrategy(view, builder);
      var modelData!: M;
      data.subscribe(
        (model: M) => {
          console.log(model)
          modelData = model;
          od.compose(modelData);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
        () => {
          od.compose(modelData);
          resolve(modelData);
        }
      );
    });
    return promise;
  }
}
