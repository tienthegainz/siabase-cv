import cx from 'classnames';
// import { graphql, useStaticQuery } from 'gatsby';
// import GatsbyImage from 'gatsby-image';
import React, { memo } from 'react';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import templateOptions from '../../../../data/templateOptions';
import templatePreviews from '../../../../data/templatePreviews.json';
import { handleKeyUp } from '../../../../utils';
import Heading from '../../../shared/Heading';
import styles from './Templates.module.css';

const Templates = ({ id }) => {
  const dispatch = useDispatch();
  const template = useSelector('metadata.template');

  // const previews = useStaticQuery(graphql`
  //   query {
  //     onyx: file(relativePath: { eq: "templates/onyx.png" }) {
  //       childImageSharp {
  //         fluid(maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     pikachu: file(relativePath: { eq: "templates/pikachu.png" }) {
  //       childImageSharp {
  //         fluid(maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     gengar: file(relativePath: { eq: "templates/gengar.png" }) {
  //       childImageSharp {
  //         fluid(maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     castform: file(relativePath: { eq: "templates/castform.png" }) {
  //       childImageSharp {
  //         fluid(maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     glalie: file(relativePath: { eq: "templates/glalie.png" }) {
  //       childImageSharp {
  //         fluid(maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     celebi: file(relativePath: { eq: "templates/celebi.png" }) {
  //       childImageSharp {
  //         fluid(maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `);

  const handleClick = valueToUpdate => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.template',
        value: valueToUpdate
      }
    });
    dispatch({
      type: 'on_input',
      payload: {
        path: 'preview',
        value: templatePreviews[valueToUpdate]
      }
    });
    // dispatch({ type: 'update_skynet_synced_status' });
  };

  return (
    <section>
      <Heading id={id} />

      <div className='grid grid-cols-2 gap-8'>
        {templateOptions.map(x => (
          <div
            key={x.id}
            tabIndex='0'
            role='button'
            onKeyUp={e => handleKeyUp(e, () => handleClick(x.id))}
            onClick={() => handleClick(x.id)}
            className={cx(styles.template, {
              [styles.selected]: template === x.id
            })}
          >
            <img
              alt={x.name}
              loading='eager'
              className='w-full'
              style={{ height: '230px' }}
              src={templatePreviews[x.id]}
            />

            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Templates);
