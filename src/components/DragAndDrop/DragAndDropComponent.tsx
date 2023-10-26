import React, { FC, useMemo } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

import clsx from 'clsx';

import { FolderIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  label: string;
  placeholder: string;
  maxFiles?: number;
  accept?: Accept;
  disabled?: boolean;
  handleDrop: (files: File[]) => void;
};

export const DragAndDropComponent: FC<Props> = ({
  className,
  label,
  maxFiles,
  accept,
  disabled,
  placeholder,
  handleDrop
}) => {
  const { acceptedFiles, isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    maxFiles,
    accept,
    disabled
  });

  const selectedPlaceholder = useMemo(() => {
    return acceptedFiles.length ? acceptedFiles.map((file) => file.name).join(', ') : null;
  }, [acceptedFiles.length]);

  return (
    <div className={clsx(style.dragAndDropContainer, className)} {...getRootProps()} role="button">
      <input {...getInputProps()} />

      <FolderIcon className={clsx(style.dragAndDropIcon, !!acceptedFiles.length && style.dragAndDropIconSelected)} />

      <div>
        <p className={style.dragAndDropLabel}>{label}</p>
        <p className={style.dragAndDropPlaceholder}>
          {isDragActive ? 'Drop your file right here' : selectedPlaceholder || placeholder}
        </p>
      </div>
    </div>
  );
};
