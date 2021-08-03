import React from 'react';
import Link from 'next/link'
import { DocumentContext } from 'next/document';

export default function IndexPage() {
  return (
    <div>
      <p>Public profile here</p>
      <Link href="/_">Open reader</Link>
    </div>
  )
}

export async function getServerSideProps(context : DocumentContext) {
  return {
    redirect: {
      destination: '/_' //TODO currently redirect to reader
    }
  }
}
