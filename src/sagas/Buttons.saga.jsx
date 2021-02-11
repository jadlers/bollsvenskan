import React from "react";

import { Button, CardButton, ExternalLinkButton } from "./Buttons";
import Card from "./Card";

export default function ButtonsSaga() {
  return (
    <div className="space-y-2">
      <p>
        Plain <code>Button</code>
      </p>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button>No variant</Button>

      <br />
      <p>
        <code>Button</code> with <code>hoverBg</code> set
      </p>
      <Button hoverBg="nord-1" variant="primary">
        Primary
      </Button>
      <Button hoverBg="nord-1" variant="secondary">
        Secondary
      </Button>
      <Button hoverBg="nord-1" variant="tertiary">
        Tertiary
      </Button>
      <Button hoverBg="nord-1">No variant</Button>

      {/* <Button variant="invalid">Causes compile error</Button> */}
      <Card>
        <p>
          Plain <code>Button</code> on a <code>Card</code>
        </p>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button>No variant</Button>

        <br />
        <p>
          <code>CardButton</code> on a <code>Card</code>
        </p>
        <CardButton variant="primary">Primary</CardButton>
        <CardButton variant="secondary">Secondary</CardButton>
        <CardButton variant="tertiary">Tertiary</CardButton>
        <CardButton>No variant</CardButton>

        <br />
        <p>
          <code>CardButton</code> with special <code>hoverBg</code>
        </p>
        <CardButton hoverBg="nord-14">Different</CardButton>
      </Card>

      <div>
        <p>
          <code>ExternalLink</code>
        </p>
        <ExternalLinkButton variant="primary">Primary</ExternalLinkButton>
        <ExternalLinkButton variant="secondary">Secondary</ExternalLinkButton>
        <ExternalLinkButton variant="tertiary">Tertiary</ExternalLinkButton>
        <ExternalLinkButton>No variant</ExternalLinkButton>
      </div>

      <div>
        <p>
          <code>ExternalLink</code> with <code>hoverBg</code> set
        </p>
        <ExternalLinkButton hoverBg="nord-2" variant="primary">
          Primary
        </ExternalLinkButton>
        <ExternalLinkButton hoverBg="nord-2" variant="secondary">
          Secondary
        </ExternalLinkButton>
        <ExternalLinkButton hoverBg="nord-2" variant="tertiary">
          Tertiary
        </ExternalLinkButton>
        <ExternalLinkButton hoverBg="nord-2">No variant</ExternalLinkButton>
      </div>
    </div>
  );
}
