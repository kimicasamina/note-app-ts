import React, { ReactElement, ReactNode } from "react";

// Conventional props
function Heading({ title }: { title: string }) {
  return <h1 className="">{title}</h1>;
}

function HeadingWithContent({
  children,
}: {
  children: ReactNode;
}): ReactElement | null {
  return <h1 className="">{children}</h1>;
}

// defaultProps
const ContainerDefaultProps = {
  heading: <strong>Hello, this is the default Heading</strong>,
};

type ContainerProps = {
  children: ReactNode;
} & typeof ContainerDefaultProps;
function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div className="">
      <h1 className="">{heading}</h1>
      {children}
    </div>
  );
}

function ModalContainer({
  title,
  children,
}: {
  title?: string;
  children: (username: string) => ReactNode;
}): ReactElement {
  const [username, usernameSet] = React.useState<string>("");
  return (
    <div>
      <h2 className="">{title}</h2>
      {children(username)}
      <input
        type="text"
        className=""
        value={username}
        onChange={(e) => usernameSet(e.target.value)}
      />
    </div>
  );
}

// List
function CategoryList<CategoryList>({
  items,
  render,
}: {
  items: CategoryList[];
  render: (item: CategoryList) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}
// Class Component
class MyHeader extends React.Component<{ title: ReactNode }> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

export default function Sample() {
  return (
    <>
      <Heading title="Hello world" />
      <HeadingWithContent>
        <h1 className="">Hello This is The heading with children</h1>
      </HeadingWithContent>
      <Container heading={ContainerDefaultProps.heading}>
        Hello this is the Container
      </Container>
      <ModalContainer>
        {(username: string) => <div>Hello, {username}</div>}
      </ModalContainer>
      <MyHeader title="Ok ok ok ok" />
      <CategoryList
        items={["Programming", "Cooking", "Finance"]}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></CategoryList>
    </>
  );
}
