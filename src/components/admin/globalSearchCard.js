import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function GlobalSearchBox() {
  return (
    <div className="py-2 border-bottom">
      <div class="d-flex profile_box gx-2 justify-content-between">
        <div class=" mb-0">
          <span
            class="m-0 font-size-4 font-weight-bold text-capitalize"
            title="test ashishkjh"
          >
            Username Surname
          </span>
          <p class="text-gray font-size-3 m-0 text-capitalize">
            M(married, 25Y)
          </p>
        </div>
        <div class="contact_div text-right">
          <p className="m-0 font-size-3">1234567890</p>
          <p className="m-0 font-size-3">email@email.com</p>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchBox;
